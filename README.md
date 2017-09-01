![Grunt](https://cdn.gruntjs.com/builtwith.png)


sample-angular-project
===========================

Sample angular project that uses indexDB storage to create and list job ads.

## Code organization

### Project organization
The project's structure has been derived from [ng-boilerplate](https://github.com/ngbp/ngbp/blob/v0.3.2-release/README.md#overall-directory-structure)

```
sample-angular-project/
  |- grunt-tasks/
  |- coverage/    #  contains coverage output
  |- build/    # contains output of the build process, used to serve files in development
  |- bin/    # contains output of the compile process, used to serve files in production
  |- karma/    # contains configuration for karma
  |  |- karma-unit.tpl.js
  |- src/      # contains the source code of the application
  |  |- app/      # contains the source code of the angular app and app-specific code
  |  |  |- app1    # a single app
  |  |  |  |- tpls      # contains app1's templates/partials
  |  |  |  |  |- app1.tpl.html
  |  |  |  |  |- app2.tpl.html
  |  |  |  |- tests      # contains app1's tests
  |  |  |  |  |- module.spec.js
  |  |  |  |  |- routes.spec.js
  |  |  |  |  |- controllers.spec.js
  |  |  |  |- module.js      # contains app1's module definition
  |  |  |  |- routes.js      # contains app1's states
  |  |  |  |- controllers.js # contains app1's controllers
  |  |  |  |- ...
  |  |  |- app2
  |  |  |- app3
  |  |  |- ...
  |  |- assets/
  |  |  |- <static files>
  |  |- common/
  |  |  |- <reusable code>
  |  |- less/
  |  |  |- main.less
  |  |- settings.js  # contains the application's 'environment' configuration
  |- vendor/
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- changelog.tpl
  |- circle.yml
  |- .gitignore
  |- .jshintrc
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```

## Development

### Development environment
First run
```bash
$ grunt build
```

then
```bash
$ grunt connect:dev
```


### Production environment

To see what is going to be developed, run

```bash
$ grunt
```

or

```bash
$ grunt build
$ grunt compile
```

This will create the 'compiled' files in the ```bin``` directory.

The files can then be served using

```bash
$ grunt connect:prod
```
