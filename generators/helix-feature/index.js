'use strict'

var Generator = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var guid = require('node-uuid');
const prompts = require('../../global/helix.feature.prompts');

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

    configure() {
        this.projectGuid = '{' + guid.v4() + '}';

        this.targetPath = path.join('src', 'Feature', this.featureName);
        this.log('Feature Path: ' + this.targetPath);
    }

    initialFolders() {

        mkdirp.sync(path.join(this.targetPath, 'tests'));
        mkdirp.sync(path.join(this.targetPath, 'serialization'));
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

    project() {
        this.fs.copyTpl(
            this.templatePath('Feature/code/.Sitecore.Feature.csproj'),
            this.destinationPath(path.join(this.targetPath, 'code', 'Sitecore.Feature.' + this.featureName + '.csproj')), {
                projectGuid: this.projectGuid,
                featureName: this.featureName
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

    serialization() {

        this.fs.copyTpl(
            this.templatePath('Feature/code/App_Config/Include/Feature/.Feature.Sample.Serialization.config'),
            this.destinationPath(path.join(this.targetPath, 'code/App_Config/Include/Feature/', 'Feature.' + this.featureName + '.Serialization.config')), {
                featureName: this.featureName
            }
        );
    }

};