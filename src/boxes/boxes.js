'use strict';

exports.boxes = [
    {
        box: 'linkslist',
        args: {
            'pos-absolute': '',
            top: '60px',
            left: '0',
            links: JSON.stringify([
                ["http://tvnewsroom.consilium.europa.eu", "EU Council TV"],
                ["https://newsroom.bnpparibasfortis.com", "BNP Newsroom"],
                ["http://knowledgecenter.manpower.be", "Manpower Knowledge-center"]
            ])
        },
    },
    {
        box: 'clock',
        args: {
            'pos-absolute': '',
            top: '0',
            right: '2%',
        }
    },
    {
        box: 'sysinfo',
        args: {
            'pos-absolute': '',
            top: '50%',
            left: '0',
            width: '400px'
        }
    },
    {
        box: 'pingslist',
        args: {
            'pos-absolute': '',
            right: '0',
            top: '50%',
            probes: JSON.stringify([
                {
                    type: 'http',
                    target: 'http://tvnewsroom.consilium.europa.eu'
                },
                {
                    type: 'http',
                    target: 'https://newsroom.bnpparibasfortis.com'
                }
            ])
        }
    },
    {
        box: 'dummy',
        args: {
            'pos-absolute': '',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px'
        }
    }
];
