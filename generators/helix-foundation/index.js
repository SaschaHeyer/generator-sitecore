'use strict'

var Generator = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var guid = require('node-uuid');
const prompts = require('../../global/helix.foundation.prompts');
const versionSitecorePrompts = require('../../global/version.sitecore.prompts');

module.exports = class extends Generator {

    constructor(args, opts) { super(args, opts); }

    init() {
        this.log('helix foundation');
    }


    prompting() {

        return this.prompt(prompts).then((answers) => {
            this.foundationName = answers.foundationName;
            this.log('foundation name:' + this.foundationName);
        });

    }

    promptingSitecoreVersion() {
        if (!this.config.get('sitecoreVersion')) {

            this.log(chalk.magenta('No Sitecore version preset found, please select a Sitecore version'));

            return this.prompt(versionSitecorePrompts).then((answers) => {

                this.config.set('sitecoreVersion', answers.sitecoreVersion);

            });
        }
    }

    configure() {
        this.projectGuid = '{' + guid.v4() + '}';

        this.targetPath = path.join('src', 'Foundation', this.foundationName);
        this.log('foundation Path: ' + this.targetPath);
    }

    initialFolders() {

        mkdirp.sync(path.join(this.targetPath, 'tests'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config/Include'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config/Include' + this.foundationName));
        mkdirp.sync(path.join(this.targetPath, 'code/Controllers'));
        mkdirp.sync(path.join(this.targetPath, 'code/Models'));
        mkdirp.sync(path.join(this.targetPath, 'code/Repositories'));
        mkdirp.sync(path.join(this.targetPath, 'code/Views/' + this.foundationName));

        this.fs.copy(
            this.templatePath('foundation/**'),
            this.destinationPath(this.targetPath), {
                globOptions: { dot: false }
            }
        );
    }

    unicorn() {
        if (this.config.get('unicorn')) {
            mkdirp.sync(path.join(this.targetPath, 'serialization'));

            this.fs.copyTpl(
                this.templatePath('foundation/code/App_Config/Include/Foundation/.Foundation.Sample.Serialization.config'),
                this.destinationPath(path.join(this.targetPath, 'code/App_Config/Include/Foundation/', 'Foundation.' + this.foundationName + '.Serialization.config')), {
                    foundationName: this.foundationName
                }
            );
        }
    }

    project() {
        this.fs.copyTpl(
            this.templatePath('foundation/code/.Sitecore.Foundation.csproj'),
            this.destinationPath(path.join(this.targetPath, 'code', 'Sitecore.Foundation.' + this.foundationName + '.csproj')), {
                projectGuid: this.projectGuid,
                foundationName: this.foundationName,
                sitecoreVersion: this.config.get('sitecoreVersion'),
                unicorn: this.config.get('unicorn')
            }
        );
    }

    packages() {
        this.fs.copyTpl(
            this.templatePath('foundation/code/.packages.config'),
            this.destinationPath(path.join(this.targetPath, 'code', 'packages.config')), {
                sitecoreVersion: this.config.get('sitecoreVersion')
            }
        );
    }

    assembly() {

        this.fs.copyTpl(
            this.templatePath('foundation/code/Properties/.AssemblyInfo.cs'),
            this.destinationPath(path.join(this.targetPath, 'code/Properties', 'AssemblyInfo.cs')), {
                foundationName: this.foundationName
            }
        );
    }
};