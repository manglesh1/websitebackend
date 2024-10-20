const axios = require('axios');
const XLSX = require('xlsx');

// Correctly define getSheetData as an async function
async function getSheetData(sheetName, location) {
    const gcpBucketUrl = `https://docs.google.com/spreadsheets/d/1zpV1juNopYe4bnFP959w3ldwj0dC-3WF/export?format=xlsx`;
    try {
        const response = await axios.get(gcpBucketUrl, { responseType: 'arraybuffer' });
        const data = response.data;
        const workbook = XLSX.read(data, { type: 'buffer' });
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Sheet "${sheetName}" not found.`);
        }
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Filter and transform data appropriately
        if (sheetName === 'config') {
            jsonData = jsonData.map(m => ({
                ...m,
                value: m.value.replace(/\r?\n|\r/g, "<br/>")
            }));
        }
        console.log(location);
        if(!location)
        {
            return jsonData;
        }
        else 
        return jsonData.filter(m => m.location.indexOf(location) > -1 || m.location === '');
    } catch (error) {
        console.error(`Error fetching data from sheet "${sheetName}":`, error);
        throw error;
    }
}

const fetchSheetData = async (req, res) => {
    try {
        const dt = await getSheetData(req.query.sheetname, req.query.location);
        res.status(200).send(dt);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchMenuData = async (req, res) => {
    try {
        const jsonData = await getSheetData("Data", req.query.location);
        console.log(jsonData.length)
        
        // Create an object to hold the hierarchy
        const hierarchy = {};

        // First pass: create entries for each item, omitting 'section1' and 'section2'
        jsonData.forEach(item => {
            const { section1, section2,ruleyes,ruleno,...restOfItem } = item; // Omit 'section1' and 'section2'
            hierarchy[item.path] = { ...restOfItem, children: [] };
        });

        // Second pass: assign children to their respective parents
        jsonData.forEach(item => {
            if (item.parentid && hierarchy[item.parentid]) {
                hierarchy[item.parentid].children.push(hierarchy[item.path]);
            }
        });

        // Extract the root nodes
        const result = Object.values(hierarchy).filter(item => !item.parentid || !hierarchy[item.parentid]);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchMenuData1 = async (req, res) => {
    try {
        const jsonData = await getSheetData("Data", req.query.location);
        
        // Create an object to hold the hierarchy
        const hierarchy = {};

        // First pass: create entries for each item, omitting 'section1' and 'section2'
        jsonData.forEach(item => {
            const { section1, section2,ruleyes,ruleno,...restOfItem } = item; // Omit 'section1' and 'section2'
            hierarchy[item.path] = { ...restOfItem, children: [] };
        });

        // Second pass: assign children to their respective parents
        jsonData.forEach(item => {
            if (item.parentid && hierarchy[item.parentid]) {
                hierarchy[item.parentid].children.push(hierarchy[item.path]);
            }
        });

        // Extract the root nodes
        const result = Object.values(hierarchy).filter(item => !item.parentid || !hierarchy[item.parentid]);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



const fetchPageData = async (req, res) => {
    try {
        const jsonData = await getSheetData("Data", req.query.location);       
        const filteredData = jsonData.filter(m => m.path.toUpperCase().indexOf(req.query.page.toUpperCase()) > -1);  
        res.status(200).send(filteredData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    fetchSheetData,
    fetchMenuData,
    fetchMenuData1,
    fetchPageData

};
