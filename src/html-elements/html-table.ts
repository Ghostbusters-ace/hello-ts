export class HTMLTable {
    private tableEl : HTMLTableElement = document.createElement('table')

    private tableContent: Array<string> = []

    /**
     * Sets content  to display in the table
     * @param content 
     */
    public setTableContent(content:JSON): void{
this.tableContent = content.parse()
    }

    public build(): HTMLTableElement{

         // First create a row
         const row: HTMLTableRowElement = document.createElement('tr')

         const head: HTMLTableCellElement = document.createElement('th')
         const nom = document.getRootNode()
         //head.innerHTML = nom.name
        
         this.tableEl.appendChild(head)

        //Loop over content to create rows and cells
        for (const content of this.tableContent) {
            
            // First create a row
            const row: HTMLTableRowElement = document.createElement('tr')

            const checkbox = document.createElement("INPUT");
            checkbox.setAttribute("type", "checkbox");
            row.appendChild(checkbox)
           
            // Second create a td table divider
            const divider: HTMLTableCellElement = document.createElement('td')

            //Put content in divider 
            divider.textContent = content

            //Add divider to row
            row.appendChild(divider)

            this.tableEl.setAttribute('border','2')

            //Add row to table
            this.tableEl.appendChild(row)
        }
        return this.tableEl
    }
}