'use strict';

module.exports = [{
    type: 'list',
    name: 'type',
    message: 'What type of application do you want to create? (more soon)',
    choices: [{
            name: 'Helix Solution',
            value: 'helixSolution'
        },
        {
            name: 'Helix (Feature)',
            value: 'helixFeature'
        },
        {
            name: 'Helix (Foundation)',
            value: 'helixFoundation'
        },
        /*{
            name: 'Sitecore Experience Platform',
            value: 'sxp'
        },
        {
            name: 'Sitecore Data Exchange Framework',
            value: 'dxf'
        }*/
    ]
}];