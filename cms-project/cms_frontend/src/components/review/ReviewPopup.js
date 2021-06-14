import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import {Document, Page, pdfjs } from 'react-pdf'
import samplePdf from './testFile.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReviewPopup = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages}) => {
        setNumPages(numPages)
    }
    
    const nextPage = () => {
        if(pageNumber >= numPages)
            return;
        setPageNumber(pageNumber + 1);
    }

    const previousPage = () => {
        if(pageNumber <= 1)
            return;
        setPageNumber(pageNumber - 1);
    }

    return (
        <div>
        <Document
            file={samplePdf}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber}></Page>
        </Document>
        
        <Button onClick={() => previousPage()}>Prev</Button>
        <Button onClick={() => nextPage()}>Next</Button>
        
        <p>Page {pageNumber} of {numPages}</p>
        </div>
    )
}

export default ReviewPopup
