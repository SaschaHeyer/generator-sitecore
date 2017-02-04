'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var mkdirp = require('mkdirp');
var guid = require('node-uuid');
const prompts = require('../../global/helix.solution.prompts');
const versionSitecorePrompts = require('../../global/version.sitecore.prompts');

module.exports = class extends Generator {

    constructor(args, opts) { super(args, opts); }

    /*init() {
        this.log(yosay('Welcome to the ' + chalk.magenta('Sitecore') + ' generator, more soon!. For updates visit www.blog.saschaheyer.de'));
    }*/

    prompting() {

        return this.prompt(prompts).then((answers) => {

            this.projectName = answers.projectName;
            this.solutionName = answers.solutionName;
            this.git = answers.git;
            this.type = answers.type;
            this.type = answers.helixtype;

            this.config.set('unicorn', answers.unicorn);
            this.config.set('projectName', this.projectName);
            this.config.set('solutionName', this.solutionName)
            this.config.set('type', this.type);
            this.config.set('helixType', this.helixtype)
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
        this.configFolder = '{' + guid.v4() + '}';
        this.featureFolder = '{' + guid.v4() + '}';
        this.projectFolder = '{' + guid.v4() + '}';
        this.foundationFolder = '{' + guid.v4() + '}';
        this.solutionFolder = '{' + guid.v4() + '}';

        this.codePath = path.join('src', 'Project', this.solutionName);
    }

    createFolder() {

        this.log(this.projectName);
        this.log(this.solutionName);
        this.log(this.type);
        this.log(this.helixtype);

        mkdirp.sync('lib/Sitecore');
        mkdirp.sync('src/Feature');
        mkdirp.sync('src/Foundation');
        mkdirp.sync('src/Project');
        mkdirp.sync('src/Project/' + this.solutionName);
        mkdirp.sync('src/Project/' + this.solutionName + '/code');
        mkdirp.sync('src/Project/' + this.solutionName + '/code/App_Config');
        mkdirp.sync('src/Project/' + this.solutionName + '/code/App_Config/Include');
        mkdirp.sync('src/Project/' + this.solutionName + '/code/Views'); 
        mkdirp.sync('src/Project/' + this.solutionName + '/tests');
    }

    unicorn()
    {
        if(this.config.get('unicorn'))
        {
            mkdirp.sync('src/Project/' + this.solutionName + '/serialization');

            this.fs.copyTpl(
                this.templatePath('src/Project/Sample/code/App_Config/Include/.Serialization.config'),
                this.destinationPath(path.join(this.codePath, 'code/App_Config/Include/' + this.solutionName, this.solutionName + '.Website.Serialization.config')), {
                    solutionName: this.solutionName
                }
            );
        }
    }

    git() {
        if(!this.git)
        {
            return;
        }
        
        this.fs.copy(
            this.templatePath('.ignore'), this.destinationPath(path.join('.gitignore'))
        );

        this.fs.copy(
            this.templatePath('.attributes'), this.destinationPath(path.join('.gitattributes'))
        );
             
    }

    files() {
        this.fs.copyTpl(
            this.templatePath('README.md'), this.destinationPath(path.join('README.md')), {
                solutionName: this.solutionName
            }
        );
    }

    project() {
        this.fs.copyTpl(
            this.templatePath('Solution.sln'),
            this.destinationPath(path.join(this.props.solutionName + '.sln')), {
                configFolder: this.props.configFolder,
                featureFolder: this.props.featureFolder,
                foundationFolder: this.props.foundationFolder,
                projectFolder: this.props.projectFolder,
                solutionFolder: this.props.solutionFolder,
                solutionName: this.props.solutionName,
                projectGuid: this.props.projectGuid
            }
        );
    }

    folder() {
        this.fs.copy(
            this.templatePath('src/Project/Sample/code/**'),
            this.destinationPath(path.join(this.codePath, 'code')), {
                globOptions: { dot: false }
            }
        );
    }

    project() {
        this.fs.copyTpl(
            this.templatePath('src/Project/Sample/code/.Sitecore.Project.Website.csproj'),
            this.destinationPath(path.join(this.codePath, 'code', this.solutionName + '.Website.csproj')), {
                projectGuid: this.projectGuid,
                solutionName: this.solutionName,
                sitecoreVersion: this.config.get('sitecoreVersion'),
                unicorn: this.config.get('unicorn')
            }
        );
    }

    packages() {
        this.fs.copyTpl(
            this.templatePath('src/Project/Sample/code/.packages.config'),
            this.destinationPath(path.join(this.codePath, 'code', 'packages.config')), {
                sitecoreVersion: this.config.get('sitecoreVersion')
            }
        );
    }

    assembly() {

        this.fs.copyTpl(
            this.templatePath('src/Project/Sample/code/Properties/.AssemblyInfo.cs'),
            this.destinationPath(path.join(this.codePath, 'code/Properties', 'AssemblyInfo.cs')), {
                assemblyName: this.solutionName + '.Website'
            }
        );
    }

    nuget() {
        this.fs.copy(
            this.templatePath('nuget.config'),
            this.destinationPath(path.join('nuget.config'))
        );
    }

    solution() {
        this.fs.copyTpl(
            this.templatePath('Solution.sln'),
            this.destinationPath(path.join(this.solutionName + '.sln')), {
                configFolder: this.configFolder,
                featureFolder: this.featureFolder,
                foundationFolder: this.foundationFolder,
                projectFolder: this.projectFolder,
                solutionFolder: this.solutionFolder,
                solutionName: this.solutionName,
                projectGuid: this.projectGuid,
            }
        );
    }
};