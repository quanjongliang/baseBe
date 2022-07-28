import { Injectable } from "@nestjs/common";
import * as PDFDocument from "pdfkit";
import * as fs from "fs";
import { Response } from "express";
import { dataCv } from "../data";
import { HttpService } from "@nestjs/axios";
@Injectable()
export class PdfService {
  constructor(private httpService: HttpService) {}
  async createFilePdf(name: string, res: Response) {
    const pdfDoc = new PDFDocument();
    const date = new Date();
    // pdfDoc.pipe(fs.createWriteStream(`${name}-${date.getTime()}.pdf`));
    pdfDoc.text(
      "From Mon-Sat we will have a 10% discount on selected items!",
      150,
      150
    );
    pdfDoc.fillColor("red").fontSize(17).text("20%", 305, 150);
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  async createResumePdf(res: Response) {
    const image = await this.httpService.axiosRef.get(
      "https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/289823588_1250891838780994_5228189453786981952_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IC9fHvLjppkAX-usULd&_nc_ht=scontent.fhan3-2.fna&oh=00_AT-jS-mkrFuuY7Wz_O28UgTCtp5F3ehZDde36JDjSCEcPQ&oe=62E46A97",
      {
        responseType: "arraybuffer",
      }
    );
    const data = dataCv;
    const date = new Date();
    const pdfDoc = new PDFDocument();
    // pdfDoc.pipe(fs.createWriteStream(`${date.getTime()}.pdf`));
    pdfDoc.image(image.data, 400, 0, { width: 200, height: 200 });
    pdfDoc
    .text("This is a link", { link: 'https://pdfkit.org/docs/guide.pdf', underline: true });
    pdfDoc.text(data.name);
    pdfDoc.text(data.dateOfBirth);
    pdfDoc.text(data.address);
    pdfDoc.text(data.phone);
    dataCv.content.forEach((data) => {
      pdfDoc.text(data.title);
      data.data.forEach((d) => {
        pdfDoc.text(d.companyName);
        pdfDoc.text(`${d.startTime} - ${d.endTime ? d.endTime : "present"}`);
        pdfDoc.text(d.companyName);
        pdfDoc.text(d.role);
        pdfDoc.text("Projects: ");
        d.projects.forEach((p) => {
          pdfDoc.text(p.name);
          pdfDoc.text(p.technology.join(", "));
          pdfDoc.text(p.description);
          p.contribute.forEach((c) => {
            pdfDoc.text(`* ${c}`);
          });
        });
      });
    });
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
