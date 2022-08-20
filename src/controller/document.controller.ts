import {Request, Response} from 'express';
import { QueryBuilder } from "../model/model";

const table: string = "document_spsi";
const column: Array<string> = [
  "name_doc",
  "type_doc",
  "file_doc",
];

export const findDocument = async (req:Request, res:Response) => {
    await QueryBuilder.select(column)
    .table(table)
    .then((result: any) => {
      return res.send({
        status: "success",
        message: "Success get data document!",
        data: result,
      });
    })
    .catch((err: any) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
}