'use strict';

module.exports = [{
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
            ]
            /*,
                    when: function(answers) {
                        return answers.helixtype === 'soon';
                    }*/

    }

];