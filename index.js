const button = document.querySelector('.btn');
const csvButton = document.querySelector('.csvButton')
const tableRows = document.querySelector('.table_rows')


const buyer = document.querySelector('.buyer')
const date = document.querySelector('.date')
const invoiceNo = document.querySelector('.invoiceNo')
const phoneNo = document.querySelector('.phoneNo');
const subTotal = document.querySelector('.subTotal')

console.log(buyer)
console.log(date)
console.log(invoiceNo)
console.log(phoneNo)
console.log(subTotal)



let srNo = 0;


// EVENT LISTENERS
button.addEventListener('click', handleButtonClick)
csvButton.addEventListener('click', exportCSV)


// CSV RELATED TASK
function exportCSV(){

    // INVOICE DETAILS
    const buyerValue = buyer.value;
    const dateValue = date.value;
    const invoiceValue = invoiceNo.value
    const phoneValue = phoneNo.value
    const subTotalValue = subTotal.value


    const csvData = []

    csvData.push(["Buyer's Name", "Date","Phone Number", "Invoice No",  "Sub Total"])
    csvData.push([buyerValue, dateValue, phoneValue, invoiceValue, subTotalValue])
    csvData.push([])
    csvData.push([])


    // INVOICE RECORDS
    const records = document.querySelectorAll("tr");
     //FIELDS
    let fields = Array.from(records[0].children)
    fields = fields.map((column)=>column.textContent )
    csvData.push(fields)
     // ROWS
    for(let i=1; i<records.length; i++){
        let row = Array.from(records[i].children)
        row = row.map((data,idx)=>{
            if(idx === 0) return data.textContent;
            else return data.children[0].value;
        })
        csvData.push(row)
    }






    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(csvData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PharmacyInvoice');
    
    XLSX.writeFile(workbook, 'PharmacyInvoice.xlsx');
}


// ADD ROW
function handleButtonClick(){
    srNo++;
    const html = `
    <tr>
        <td>${srNo}</td>
        <td><input class="input_large"/></td>
        <td><input/></td>
        <td><input/></td>
        <td><input/></td>
        <td><input/></td>
        <td><input/></td>
        <td><input/></td>
        <td><input/></td>
    </tr>
    `
    tableRows.innerHTML+= html;
}