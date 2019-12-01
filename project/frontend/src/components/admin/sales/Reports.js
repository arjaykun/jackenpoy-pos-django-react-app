import React, { Fragment } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CsvDownloader from 'react-csv-downloader';
function Reports(props) {
	const count = props.sales.reduce( (a,b) => (
 						a+ Number(b.count)), 0)
	const total = props.sales.reduce( (a,b) => (
			     		a+ Number(b.sales)), 0).toFixed(2)

	const now = new Date().toLocaleDateString();
 	const csv_sales = props.sales.map( s => ({
		        	date: new Date(s.date).toDateString(),
			        	count: s.count,
			        	sales: s.sales.toFixed(2),
	            	}));

	const savePdf = () => {
		var doc = new jsPDF();
	    var totalPagesExp = "{total_pages_count_string}";
	    const sales = props.sales.map( s => ({
			        	date: new Date(s.date).toDateString(),
			        	count: s.count,
			        	sales: "P" + s.sales.toFixed(2),
	            	}));
	    doc.autoTable({
	        head: [{date:"Date",count:"Order Count", sales:"Total Sales"}],
	        body: [ ...sales, {date:"Total", count: count, sales:"P" + total}],
	        didDrawPage: function(data) {
	        	//header
	        	doc.setFontSize(20);
	            doc.setTextColor(40);
	            doc.setFont('Arial','Bold');
	            doc.text("Jack En Poy", data.settings.margin.left, 22);

	        	doc.setFontSize(12);
	            doc.setTextColor(40);
	            doc.setFont('Arial','Normal');
	            doc.text("Sales Report", data.settings.margin.left, 27);

	            doc.setFontSize(12);
	            doc.setTextColor(40)
	            doc.setFont('Arial','Normal');
	            doc.text(new Date().toDateString(), data.settings.margin.left, 32);

	             // Footer
	            var str = "Page " + doc.internal.getNumberOfPages()
	            // Total page number plugin only available in jspdf v1.0+
	            if (typeof doc.putTotalPages === 'function') {
	                str = str + " of " + totalPagesExp;
	            }
	            doc.setFontSize(10);

	            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
	            var pageSize = doc.internal.pageSize;
	            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
	            doc.text(str, data.settings.margin.left, pageHeight - 10);
		    },
		    margin: {top:35}
	     })


	     // Total page number plugin only available in jspdf v1.0+
	    if (typeof doc.putTotalPages === 'function') {
	        doc.putTotalPages(totalPagesExp);
	    }

	    doc.save('Sales_Reports_' + now + ".pdf");
	}
	return (
		<Fragment>
		
			<div className="d-flex justify-content-end mb-2">
				<button className="btn btn-danger mr-2"
				onClick={()=>savePdf()}>
					Export to PDF
				<i className="fas fa-file-pdf ml-2"></i>
				</button>

				<CsvDownloader
			        filename={'Sales_Reports_' + now }
			        columns={[
			        	{id:'date',displayName:'Date'},
			        	{id:'count',displayName:'Order Count'},
			        	{id:'sales',displayName:'Sales'},
			        ]}
			        datas={csv_sales}>
						<button className="btn btn-success">
							Export to CSV
							<i className="fas fa-file-csv ml-2"></i>
						</button>
				</CsvDownloader>
			</div>
		</Fragment>
	);
}


export default Reports
