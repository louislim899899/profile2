// type MapType = Map<string, string>


// const experienceMap4 = new Map<string, string>([
//     ["year", "2015-2017"],
//     ["company", "Intel"],
//     ["position", "Structural Design Engineer"],
// ]sd
// )

// type EmploymentHistory = Map<string, string | string[]>;
// type WorkExperience = Map<string, EmploymentHistory>;
// type WorkExperience2 = Map<string, Map<string, string | string[]>>;

const experienceMap = new Map<string, Map<string, any>> ([
// const experienceMap3:WorkExperience[] = [
    [
        "2015",
        new Map<string, any>([
            ["year", "2015-2017"],
            ["company", "Intel"],
            ["position", "Structural Design Engineer"],
            ["description", 
                [
                    "Learned Unix scripts. Useful in operating cli environment such as hosting, server, terminal etc.",
                ]
            ]
        ]),
    ],
    [
        "2018",
        new Map<string, any>([
            ["year", "2018-2019"],
            ["company", "Inspiren Sdn Bhd"],
            ["position", "Front-end developer / Wordpress developer"],
            ["description", 
                [
                    "Worked in fast-paced environment to complete a wordpress project within 3-4 days in average, without using ready-made theme but based on designer's design",
                    "Customized plugin using PHP & javascript",
                    "Built mainly using css & vanilla javascript, also learned sass",
                    "Hosting migration, DNS, domain pointing, and other server maintenance works, mainly using Cpanel & Plesk",
                    "Learned Photoshop, Illustrator, Premiere Pro",
                ]
            ]
        ]),
    ],
    [
        "2019",
        new Map<string, any>([
            ["year", "2019-current"],
            ["company", "Intender Sdn Bhd"],
            ["position", "Full stack developer (major in Front-end)"],
            ["description", 
                [
                    "Startup company based on LAMP stack - Yii2 (PHP), phpmyadmin (Mysql)",
                    "Used Vue JS & bootstrap to create UI components that require ajax",
                    "Optimized SEO technically (eg: reducing css, js, img file size, utilizing meta tags, keywords etc), & using SEO tool eg. Google Analytic",
                    "Used python to process data over tens of thousands entries",
                    "Used Github for versioning control",
                    "Learned & implemented relational database design, and data communication betwwen frontend, backend & database",
                ],
            ],
        ]),
    ],
])

// const map2D = new Map<string, Map<string, number>>();

// // Adding values to the map
// map2D.set("row1", new Map([["col1", 10], ["col2", 20]]));
// map2D.set("row2", new Map([["col1", 30], ["col2", 40]]));

// // Accessing values in the map
// const value1 = map2D.get("row1")?.get("col1"); // Returns 10
// const value2 = map2D.get("row2")?.get("col2"); // Returns 40

export default experienceMap