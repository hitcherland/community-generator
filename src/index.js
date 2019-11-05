var $ = require('jquery');
var cytoscape = require('cytoscape');
var cola = require('cytoscape-cola');
cytoscape.use(cola);

var ColorHash = require('color-hash');
var colorHash = new ColorHash({lightness: 0.8});

var firstNames = require('./data/first-names')
var lastNames = require('./data/last-names')

$(document.body).css({
    'margin': 0,
});

var container = $('<div id="graph"></div>').appendTo(document.body);
container.css({
    'width': '100vw',
    'height': '100vh',
});

var uk_stats = {
    household_size_cdf: [{
        cumulate: 0.290361183638,
        type: [
            {cumulate: 1, description: "one person household"},
        ],
    }, {
        cumulate: 0.635081230055,
        type: [
            {cumulate: 0.12372799224680989, description: "uncoupled adults"},
            {cumulate: 1, description: "one family"},
        ],
    }, {
        cumulate: 0.793552364375,
        type: [
            {cumulate: 0.11827071538857437, description: "uncoupled adults"},
            {cumulate: 0.9558929490478641, description: "one family"},
            {cumulate: 1, description: "multifamily"},
        ],
    }, {
        cumulate: 0.933529155788,
        type: [
            {cumulate: 0.11827071538857437, description: "uncoupled adults"},
            {cumulate: 0.9558929490478641, description: "one family"},
            {cumulate: 1, description: "multifamily"},
        ],
    }, {
        cumulate: 0.980417754569,
        type: [
            {cumulate: 0.11827071538857437, description: "uncoupled adults"},
            {cumulate: 0.9558929490478641, description: "one family"},
            {cumulate: 1, description: "multifamily"},
        ],
    }, {
        cumulate: 1.0,
        type: [
            {cumulate: 0.11827071538857437, description: "uncoupled adults"},
            {cumulate: 0.9558929490478641, description: "one family"},
            {cumulate: 1, description: "multifamily"},
        ],
    }]
}

function generateCommunity(size) {
    var id = 0;
    function generateHousehold(household_id) {
        var household_name = lastNames[~~(Math.random()*lastNames.length)];
        var household = {
            group: 'nodes',
            data: {
                id: `household_${household_id}`,
                type: "household",
                household_type: undefined,
                label: household_name,
            },
        };

        let household_type, size;
        var cdf = uk_stats.household_size_cdf

        var r = Math.random();
        for(let i=0; i<cdf.length; i++) {
            let cdf_v = cdf[i].cumulate;
            if(cdf_v >= 1.0) {
                size = i + 2 - Math.exp(- 0.333 * Math.random())
                let R = Math.random()
                for(let j=0; j<cdf[i].type.length; j++) {
                    let v = cdf[i].type[j].cumulate;
                    if(R < v) {
                        household.data.household_type = cdf[i].type[j].description;
                        break;
                    }
                }
                break;
            } else if(r < cdf_v) {
                size = i + 1;
                let R = Math.random()
                for(let j=0; j<cdf[i].type.length; j++) {
                    let v = cdf[i].type[j].cumulate;
                    if(R < v) {
                        household.data.household_type = cdf[i].type[j].description;
                        break;
                    }
                }
                break;
            }
        }

        var nodes = [household];
        for(let i=0; i<size; i++) {
            let name = firstNames[~~(Math.random()*firstNames.length)];
            nodes.push({
                group: 'nodes',
                data: {
                    id: id,
                    household_id: household_id,
                    parent: `household_${household_id}`,
                    label: name,
                    first_name: name,
                    last_name: household_name,
                },
            });
            id += 1;
        }
        return nodes;
    }

    var output = [];
    var household_id = 0;
    var households = [];
    while(id < size) {
        let household_nodes = generateHousehold(household_id);
        households.push(household_nodes[0]);
        household_nodes.forEach(node => {
            output.push(node);
        });

        household_id += 1;
    }

    households.forEach(household => {
        var connect = Math.floor(Math.random() * household_id);
        while(`household_${connect}` == household.data.id) {
            connect = Math.floor(Math.random() * household_id);
        }

        output.push({
            data: {
                group: 'edges',
                id: `${household.data.id}_to_household_${connect}`,
                source: household.data.id,
                target: `household_${connect}`,
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
        selector: 'node[label]',
        css: {
            'label': 'data(label)',
            'text-valign': 'bottom',
        }
    }, {
        selector: 'node:parent[label]',
        css: {
            'color': 'white',
            'text-transform': 'uppercase',
            'font-weight': 'bold',
            'font-size': '1.1em',
            'text-background-color': 'black',
            'text-background-opacity': 1,
            'text-background-shape': 'rectangle',
            'text-background-padding': '0.1em',
        }
    }, {
        selector: 'node[household_id]',
        css: {
            'background-color': function(ele) {
                return colorHash.hex(ele.data('household_id'));
            }
        }
    }, {
        selector: 'node:parent',
        css: {
            'label': function(ele) {
                return ele.data('label') + ' (' + ele.data('household_type') + ")";
            },
            'background-color': function(ele) {
                return colorHash.hex(ele.data('household_id'));
            },
            'background-opacity': 0.333
        }
    }, {
        selector: 'edge',
        css: {
            'line-color': '#333',
            'opacity': 0.333,
        }
    }]
});
