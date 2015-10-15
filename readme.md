
# Development

This site used the yeoman [gulp-webapp generator](https://github.com/yeoman/generator-gulp-webapp). It uses bootstrap-sass for css and [nunjucks](https://mozilla.github.io/nunjucks/) for html templating.

* Install [node & npm](https://nodejs.org/en/)
* Install [bower](http://bower.io/)
* `cd` into the webapp directory
* `npm install && bower install` will install all the node and bower modules needed locally for development.
* `gulp serve` to view website locally

### Editing HTML

The html templates use [nunjucks](https://mozilla.github.io/nunjucks/). The main html file is `layouts/default.html`. The example pages use the project.html layout template.

### Gulp Tasks

* `gulp serve` to develop locally
* `gulp build` to build the production site
* `gulp --tasks` to see all gulp tasks

## Deployment

Site is deployed via [Github pages](https://pages.github.com/). The gh-pages branch contains the live site. To push to the live site:

* `gulp build` (this will create dist folder with site contents)
* `git add *` (need to commit dist folder changes to master)
* `git commit -m 'update dist'`
* `git subtree push --prefix dist origin gh-pages` (push dist folder to gh-pages)

