'use strict';

module.exports = [{
        type: 'list',
        name: 'type',
        message: 'What type of application do you want to create?',
        choices: [{
            name: 'Helix',
            value: 'helix'
        }, {
            name: 'Sitecore Experience Platform',
            value: 'sxp'
        }, {
            name: 'Sitecore Data Exchange Framework',
            value: 'dxf'
        }]
    },
    {
        type: 'list',
        name: 'helixtype',
        message: 'Which Helix Project Type would you like to create?',
        default: 'feature',
        choices: [{
                name: 'Foundation',
                value: 'foundation'
            },
            {
                name: 'Feature',
                value: 'feature'
            },
            {
                name: 'Project',
                value: 'project'
            },
            {
                name: 'Empty Helix Solution',
                value: 'emptyhelix'
            }
        ],
        when: function(answers) {
            return answers.type === 'helix';
        }

    },
    {
        type: 'list',
        name: 'sitecoreVersion',
        message: 'Which Sitecore Version would you use? (NuGet Feed)',
        default: '8.2.161221',
        choices: [{
                name: '8.2.161221',
                value: '8.2.161221'
            },
            {
                name: '8.2.161115',
                value: '8.2.161115'
            },
            {
                name: '8.2.160729',
                value: '8.2.160729'
            },
            {
                name: '8.2.160519',
                value: '8.2.160519'
            }
        ],
        when: function(answers) {
            return answers.helixtype === 'soon';
        }

    },
    {
        type: 'list',
        name: 'serializationtype',
        message: 'Item management?',
        default: 'unicorn',
        choices: [{
                name: 'Unicorn',
                value: 'unicorn'
            },
            {
                name: 'TDS',
                value: 'tds'
            },
            {
                name: 'Nothing',
                value: 'nothing'
            }
        ],
        when: function(answers) {
            return answers.helixtype === 'helix' ||
                answers.helixtype === 'project' ||
                answers.helixtype === 'feature';
        }
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter the name of your Project:',
        when: function(answers) {
            return answers.helixtype === 'foundation' ||
                answers.helixtype === 'project' ||
                answers.helixtype === 'feature';
        }
    },
    {
        type: 'input',
        name: 'solutionName',
        message: 'Enter the name of your Solution:',
        when: function(answers) {
            return answers.helixtype === 'emptyhelix';
        }
    }

];