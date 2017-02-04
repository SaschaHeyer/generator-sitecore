'use strict'

var Generator = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var guid = require('node-uuid');
const prompts = require('../../global/helix.feature.prompts');
const versionSitecorePrompts = require('../../global/version.sitecore.prompts');

module.exports = class extends Generator {

    constructor(args, opts) { super(args, opts); }

    init() {
        this.log('helix feature');
    }


    prompting() {

        return this.prompt(prompts).then((answers) => {
            this.featureName = answers.featureName;
            this.log('feature name:' + this.featureName);
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

        this.targetPath = path.join('src', 'Feature', this.featureName);
        this.log('Feature Path: ' + this.targetPath);
    }

    initialFolders() {

        mkdirp.sync(path.join(this.targetPath, 'tests'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config/Include'));
        mkdirp.sync(path.join(this.targetPath, 'code/App_Config/Include' + this.featureName));
        mkdirp.sync(path.join(this.targetPath, 'code/Controllers'));
        mkdirp.sync(path.join(this.targetPath, 'code/Models'));
        mkdirp.sync(path.join(this.targetPath, 'code/Repositories'));
        mkdirp.sync(path.join(this.targetPath, 'code/Views/' + this.featureName));

        this.fs.copy(
            this.templatePath('Feature/**'),
            this.destinationPath(this.targetPath), {
                globOptions: { dot: false }
            }
        );
    }

    unicorn()
    {
        if(this.config.get('unicorn'))
        {
            mkdirp.sync(path.join(this.targetPath, 'serialization'));

            this.fs.copyTpl(
                this.templatePath('Feature/code/App_Config/Include/Feature/.Feature.Sample.Serialization.config'),
                this.destinationPath(path.join(this.targetPath, 'code/App_Config/Include/Feature/', 'Feature.' + this.featureName + '.Serialization.config')), {
                    featureName: this.featureName
                }
            );
        }
    }

    project() {
        this.fs.copyTpl(
            this.templatePath('Feature/code/.Sitecore.Feature.csproj'),
            this.destinationPath(path.join(this.targetPath, 'code', 'Sitecore.Feature.' + this.featureName + '.csproj')), {
                projectGuid: this.projectGuid,
                featureName: this.featureName,
                sitecoreVersion: this.config.get('sitecoreVersion')
            }
        );
    }

    packages() {
        this.fs.copyTpl(
            this.templatePath('Feature/code/.packages.config'),
            this.destinationPath(path.join(this.targetPath, 'code', 'packages.config')), {
                sitecoreVersion: this.config.get('sitecoreVersion')
            }
        );
    }

    assembly() {

        this.fs.copyTpl(
            this.templatePath('Feature/code/Properties/.AssemblyInfo.cs'),
            this.destinationPath(path.join(this.targetPath, 'code/Properties', 'AssemblyInfo.cs')), {
                featureName: this.featureName
            }
        );
    }
};