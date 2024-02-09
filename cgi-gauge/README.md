# CGI Maine Automation

### Prerequisites (Global Dependency)
* [NodeJs] - Evented I/O for the backend (version 8.x or higher)
  - Once installtion done check version of Node and NVM using
    - `node --version`
    - `npm --version`
* [Gauge] - Open source test automation framework
  - Install Gauge using `npm install -g @getgauge/cli`
* [Selenium] - Support browser automation
  - Install using below steps
    - `npm install -g selenium-standalone`
    - `selenium-standalone install`

### Project Dependency
* [Express] - Node framwork
* [WebDriverIO] - WebDriver binding for Node.js

Above dependencies will be installed using 
```sh
npm install
```

###  Run Project

> Make sure you have installed all project dependecies before running project using `npm install`

Open your favorite Terminal and run these commands.
* Start Selenium server
  ```sh
    $ selenium-standalone start
    ```

* Start Node server for UI
    ```sh
    $ node app
    ```
    Above command will run node server to serve UI on 8080 port.
    If you want to keep node server run forever then run below command:
    ```sh
    $ node app forever
    ```

### Run Gauge script manually
Below command will run specified spec file. Make sure specs file exist on given location.
```sh
$ gauge run <specs_filepath>
```
Example
```sh
$ gauge run specs/NYTI.spec
```
You can find more details to run gauge specification [here](https://docs.gauge.org/execution.html).

[NodeJs]: <http://nodejs.org>
[Gauge]: <https://gauge.org/>
[Selenium]: <https://www.seleniumhq.org/>
[WebDriverIO]: <http://v4.webdriver.io>
[express]: <http://expressjs.com>