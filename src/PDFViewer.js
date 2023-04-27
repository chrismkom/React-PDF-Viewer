import React, { useState } from "react";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer() {
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedPdfFileName, setSelectedPdfFileName] = useState("");
  const [viewPdf, setViewPdf] = useState(null);
  const fileType = ["application/pdf"];

  const isPdfFile = (file) => {
    return file && fileType.includes(file.type);
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (isPdfFile(selectedFile)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (event) => {
        setSelectedPdfFile(event.target.result);
        setSelectedPdfFileName(selectedFile.name);
      };
    } else {
      setSelectedPdfFile(null);
      setSelectedPdfFileName("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setViewPdf(selectedPdfFile);
  };

  const newPlugin = defaultLayoutPlugin();

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <input
              type="file"
              onChange={handleChange}
              style={{ display: "none" }}
              id="pdf-file"
              accept="application/pdf"
            />
            <label htmlFor="pdf-file">
              <Button variant="contained" component="span" color="primary">
                Selecionar arquivo PDF
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedPdfFile}
            >
              Visualizar PDF
            </Button>
          </Grid>
        </Grid>
      </form>

      {selectedPdfFileName && (
        <Typography style={{ marginTop: "1rem" }}>
          {selectedPdfFileName
            ? `Arquivo selecionado: ${selectedPdfFileName}`
            : "Nenhum arquivo selecionado"}
        </Typography>
      )}

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
        {viewPdf ? (
          <div
            style={{
              height: 700,
            }}
          >
            <Viewer fileUrl={viewPdf} plugins={[newPlugin]} defaultScale={1} />
          </div>
        ) : null}
      </Worker>
    </Container>
  );
}

export default PDFViewer;
