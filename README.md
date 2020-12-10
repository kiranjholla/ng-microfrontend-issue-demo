# ng-microfrontends

### Introduction

The intent of this project is to put together the various moving parts that are involved in getting Angular-based Micro Frontends to work.

### Design

This is an attempt to adopt the design provided in the work of Manfred Steyer. His [article](https://www.angulararchitects.io/aktuelles/micro-apps-with-web-components-using-angular-elements/) and the [concept code](https://github.com/manfredsteyer/angular-microapp/) he provides form the basis of this project.

This project comprises of three distinct Angular Projects:

1. The App Shell
2. App One
3. App Two

### Getting it running

- Build the individual Micro Applications while ensuring that only a single bundle gets created

  ```
  # Building Application One
  cd app-one

  npm run build       # ng build --prod --single-bundle true


  # Building Application Two
  cd app-two

  npm run build       # ng build --prod --single-bundle true
  ```

- Update the `src\configs\config.json` file in the Application Shell with the bundle files that were created in the build step above
  ```
  cd app-shell\src\configs\
  code .\configs.json  # Assuming you are using VS Code to edit
  ```

- Now serve the two different Micro Applications as separate websites, separate ports. The following lines of code use the `http-server` node package to serve the different applications as an example. You may choose to serve it using a different web server.
  - First App One in one terminal window
    ```
    cd app-one\dist\app-one
    http-server . -p 8080 --cors
    ```

  - And then, serve App Two in a different terminal windwo
    ```
    cd app-two\dist\app-two
    http-server . -p 8090 --cors
    ```

- Now run the Application Shell
  ```
  cd app-shell
  ng serve -o
  ```

### Issues Encountered

#### Error in the console / Web Components fail to load

The most tricky error that is being faced currently is an intermittent error that is thrown in the Browser console. This error happens only when ES5 is enabled in the `browserlist` files for the Micro Applications. It appears that there is a conflict between the ES5 and ES2015 bundles that get generated while running the build process.

![./console-error.jpg](./console-error.jpg)

Currently, we have worked around these errors by choosing to support only modern browsers within the Micro Applications; we essentially ignore IE. A longer term solution for this problem is as yet elusive.


#### Images & Assets won't load from the original host

If any of the Micro Applications contain images or other assets that need to be included in the page that is being rendered, then those images wouldn't load. This is because though we are viewing the consolidated application with the Micro Application being rendered within the App Shell, the two applications are stil hosted in different places.

In our example, we are getting App One from `http://localhost:8080` and hence all images within App One also must be got from that server. While running the consolidated app, the host location would be `http://localhost:4200` which is where the App Shell is being served from. If there are any images or assets that are rendered within the pages of App One -- `<img src="assets/some-image.png" alt="some awesome image" />` -- the browser will look for that image at `http://localhost:4200/assets/some-image.png` and not `http://localhost:8080/assets/some-image.png` where it is actually deployed.

To fix this problem, we borrow a concept from the well known Micro Frontend Orchestration framework -- [Single SPA](https://single-spa.js.org/docs/ecosystem-angular/#angular-assets). The AssetUrlPipe that Single SPA provides can be useful here with some minor tweaks.

Since individual Micro Applications can be hosted anywhere, it is impossible for the Micro Application to itself be aware of where it is hosted. However, the App Shell definitely knows. Hence, we built in a mechanism to pass in the `hostname` from the Shell to each individual Micro Application and then convert all asset paths into absolute paths using that `hostname`.


### References

- [Micro Apps with Web Components using Angular Elements](https://www.angulararchitects.io/aktuelles/micro-apps-with-web-components-using-angular-elements/)
- [Micro Apps with Web Components and Angular Elements - Concept Code](https://github.com/manfredsteyer/angular-microapp/)
- A long Twitter conversation with [Manfred Steyer](https://twitter.com/manfredsteyer)
- [Single SPA documentation](https://single-spa.js.org/docs/ecosystem-angular/#angular-assets)
