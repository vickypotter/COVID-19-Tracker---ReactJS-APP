import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({ title, cases, total, isRed, isGreen, isGray, active, ...props }) 
{
    return (
        <div>
            <Card className={`infoBox ${active &&  "infoBox--selected"} `} onClick={props.onClick}>
                <CardContent>
                    <Typography  className="infoBox_title" color="textSecondary">{title}</Typography>
                    <h2 className={`infoBox_cases ${isGreen && "infoBox_cases-green"} ${isGray && "infoBox_cases-gray"}`}>{cases}</h2>
                    <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;
