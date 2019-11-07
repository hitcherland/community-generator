

class HouseholdFactory {
    constructor(stats) {
        this.stats = stats;
    }

    generate() {
        var r = Math.random();
    }
}

uk_stats = [
    {
        'name': 'One person household - Under 65',
        'percentage': 6.296510918628767, 
        'members': [
            {'age': '19-64', 'quantity': 1},
        ]
    },
    {
        'name': 'One person household - 65 or over',
        'percentage': 5.913748932536294, 
        'members': [
            {'age': '65+', 'quantity': 1},
        ]
    }, {
        'name': 'Two or more unrelated adults',
        'percentage': 3.5043308527510066,
        'members': [
            {'age': '19+', 'quantity': '2+', 'relationship': 'sibling,unrelated'},
        ]
    }, {
        'name': 'One family households - Couple - No children',
        'percentage': 24.818531169940222,
        'members': [
            {'age': '19+', 'quantity': '2', 'relationship': 'couple'},
        ]
    }, {
        'name': 'One family households - Couple - 1-2 dependent children',
        'percentage': 28.82914480907649,
        'members': [
            {'age': '19+', 'quantity': '2', 'relationship': 'couple,parent'},
            {'age': '0-19', 'quantity': '1-2', 'relationship': 'children'},
            {'age': '19+', 'quantity': '0+', 'relationship': 'children'},
        ]
    }, {
        'name': 'One family households - Couple - 3 or more dependent children',
        'percentage': 8.007502744906674,
        'members': [
            {'age': '19+', 'quantity': '2', 'relationship': 'couple,parent'},
            {'age': '0-19', 'quantity': '3+', 'relationship': 'children'},
            {'age': '19+', 'quantity': '0+', 'relationship': 'children'},
        ],
    }, {
        'name': 'One family households - Couple - Non-dependent children only',
        'percentage': 9.122239843845309,
        'members': [
            {'age': '19+', 'quantity': '2', 'relationship': 'couple,parent'},
            {'age': '19+', 'quantity': '1+', 'relationship': 'children'},
        ],
    }, {
        'name': 'One family households - Lone parent - Dependent children',
        'percentage': 7.484445528852018,
        'members': [
            {'age': '19+', 'quantity': '1', 'relationship': 'parent'},
            {'age': '0-18', 'quantity': '1+', 'relationship': 'children'},
            {'age': '19+', 'quantity': '0+', 'relationship': 'children'},
        ],
    }, {
        'name': 'One family households - Lone parent - Non-dependent children only',
        'percentage': 3.493656215688667
        'members': [
            {'age': '19+', 'quantity': '1', 'relationship': 'parent'},
            {'age': '19+', 'quantity': '1+', 'relationship': 'children'},
        ],
    }, {
        'name': 'Multi-family households',
        'percentage': 2.5314139319263147,
        'members': [
            {'age': '19+', 'quantity': '1+', 'relationship': 'parent'},
            {'age': '0-18', 'quantity': '0+', 'relationship': 'children'},
            {'age': '19+', 'quantity': '0+', 'relationship': 'children'},
            {'age': '19+', 'quantity': '1+', 'relationship': 'siblings,grandparents,unrelated'},
        ],
    },
]
