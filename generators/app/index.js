'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');
var guid = require('node-uuid');
const typePrompts = require('../../global/type.prompts.js');



module.exports = class extends Generator {

    constructor(args, opts) { super(args, opts); }

    init() {
        this.log(yosay('Welcome to the ' + chalk.magenta('Sitecore') + ' generator, more soon!. For updates visit www.blog.saschaheyer.de'));

        this._prompting();
    }

    _prompting() {

        return this.prompt(typePrompts).then((answers) => {

            if (answers.type === 'helixSolution') {
                this.composeWith(require.resolve('../helix-empty'));
            }

            if (answers.type === 'helixFeature') {
                this.composeWith(require.resolve('../helix-feature'));
            }

            if (answers.type === 'helixFoundation') {
                this.composeWith(require.resolve('../helix-foundation'));
            }
        });
    }

};