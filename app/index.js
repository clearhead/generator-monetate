'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
// var fs = require('fs');
// var UglifyJS = require('uglify-js');

var updateNotifier = require('update-notifier');
var pkg = require('../package.json');
var notify = updateNotifier({pkg: pkg});

var conf;
module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('Clearhead Monetate') + ' generator!'
    ));

    var idx;
    var prompts = [{
      type: 'input',
      name: 'idx',
      message: 'exp-{{int}}-slug',
      validate: function (input) {
        return /^\d+$/.test(idx = input);
      }
    },{
      type: 'input',
      name: 'name',
      message: function() {
        return 'exp-'+idx+'-{{slug}}';
      },
      validate: function (input) {
        return /^[a-z0-9-]+$/.test(input);
      }
    },{
      type: 'input',
      name: 'plan',
      message: 'Test Plan Link? (optional)'
    },{
      type: 'input',
      name: 'author',
      message: 'Author?',
      validate: function (input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {

      notify.notify();

      conf = {
        name: 'exp-'+props.idx+'-'+props.name,
        idx: props.idx,
        plan: props.plan,
        author: props.author
      };
      this.slug = conf.name + '/';

      done();
    }.bind(this));
  },

  writing: {
    globals: function () {
      this.fs.copyTpl(
        this.templatePath('variation.css'),
        this.destinationPath(this.slug + conf.name + '.css'),
        conf
      );
    },

    variations: function () {
      this.fs.copyTpl(
        this.templatePath('variation.js'),
        this.destinationPath(this.slug + conf.name + '.js'),
        conf
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: true
    });
  },

  end: function () {
    this.log(yosay(
      'Thanks!'
    ));
  }
});
