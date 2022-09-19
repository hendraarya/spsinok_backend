import { Request, Response } from 'express';
import moment from 'moment';
import { QueryBuilder } from "../model/model";

const table: string = "trialapi";
const table2: string = "mms_trial";
const table3: string = "t_hr";

export const adddataplc = (req: Request, res: Response) => {

    let {
        data1,
        data2,
    } = req.body;

    const coloumnToInsert = {
        data1: data1,
        data2: data2,

    };
    QueryBuilder(table)
        .insert(coloumnToInsert)
        .then((result: any) => {
            return res.send({
                status: "success",
                message: "Success add data trial PLC!",
            });
        })
        .catch((err: any) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while add employees.",
            });
        });

}

export const updatedatapackinga = (req: Request, res: Response) => {
    let {
        machine_status,
        shift1_run_time,
        shift1_abn_time,
        shift2_run_time,
        shift_abn_time,
        machine_name,
    } = req.body;

    const columnToUpdatePackingA = {
        machine_status,
        shift1_run_time,
        shift1_abn_time,
        shift2_run_time,
        shift_abn_time,
        updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };

    QueryBuilder(table2)
        .update(columnToUpdatePackingA)
        .where('machine_name', machine_name)
        .then((result: any) => {
            return res.send({
                status: "success",
                message: `Update Machine ${machine_name} Successfully!`,
            });
        })
        .catch((err: any) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while add employees.",
            });
        });
}

export const postdatamms = (req: Request, res: Response) => {

    let {
        mesin_id,
        status,
        power,
        date,
        time,

    } = req.body;

    const columnToInsertMMS = {
        mesin_id,
        status,
        power,
        date,
        time,
    };

    QueryBuilder(table3)
        .insert(columnToInsertMMS)
        .then((result: any) => {
            return res.send({
                status: "success",
                message: "Success add data MMS!",
            });
        })
        .catch((err: any) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while add employees.",
            });
        });

}