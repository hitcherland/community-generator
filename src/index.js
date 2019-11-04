var $ = require('jquery');
var cytoscape = require('cytoscape');
var cola = require('cytoscape-cola');
cytoscape.use(cola);

var ColorHash = require('color-hash');
var colorHash = new ColorHash({lightness: 0.8});

$(document.body).css({
    'margin': 0,
});

var container = $('<div id="graph"></div>').appendTo(document.body);
container.css({
    'width': '100vw',
    'height': '100vh',
});

function generateCommunity(size) {
    var id = 0;
    function generateFamily(family_id) {
        var members = [];
        var r = Math.random();
        let size = 0;
        if(r < 0.2745) {
            size = 1;
        } else if(r < 0.2745 + (0.4924) / 2) {
            size = 2;
        } else if(r < 0.2745 + 0.4924) {
            size = 3;
        } else if(r < 0.2745 + 0.4924 + (0.1934) / 2) {
            size = 4;
        } else if(r < 0.2745 + 0.4924 + 0.1934) {
            size = 5;
        } else {
            size = Math.floor(6 * Math.exp(Math.random() ** 10));
        }

        for(let i=0; i<size; i++) {
            members.push({
                group: 'nodes',
                data: {
                    id: id,
                    family: family_id,
                },
            });
            id += 1;
        }
        
        return members;
    }

    var output = [];
    var family_id = 0;
    var families = [];
    while(id < size) {
        let family_members = generateFamily(family_id);
        let family = {
            group: 'nodes',
            data: {
                label: `family ${family_id}`,
                'id': `family_${family_id}`,
                family: family_id,
            }
        }

        output.push(family)
        families.push(family);

        family_members.forEach(member => {
            member.data.parent = `family_${family_id}`,
            output.push(member);
            family_members.forEach(other => {
                if(other === member)
                    return

                output.push({
                    group: 'edges',
                    data: {
                        id: `intra_${member.data.id}_to_${other.data.id}`,
                        source: member.data.id,
                        target: other.data.id,
                    }
                })
            });
        });

        family_id += 1;
    }

    families.forEach(family => {
        var connect = Math.floor(Math.random() * family_id);
        while(`family_${connect}` == family.data.id) {
            connect = Math.floor(Math.random() * family_id);
        }

        output.push({
            data: {
                group: 'edges',
                id: `F2F:${family.data.id}_${connect}`,
                source: family.data.id,
                target: connect,
            }
        });
    });

    return output;
}

var cy = cytoscape({
    elements: generateCommunity(50), //elements,
    container: container[0],
    layout: {
        'name': 'cola',
        'infinite': true,
    },
    style: [{
        selector: 'node',
        css: {
            'background-color': '#f92411'
        }
    }, {
        selector: 'node[family]',
        css: {
            'background-color': function(ele) {
                return colorHash.hex(ele.data('family'));
            }
        }
    }, {
        selector: 'node:parent',
        css: {
            'background-color': function(ele) {
                return colorHash.hex(ele.data('family'));
            },
            'background-opacity': 0.333
        }
    }, {
        selector: 'edge',
        css: {
            'line-color': '#f92411'
        }
    }]
});
