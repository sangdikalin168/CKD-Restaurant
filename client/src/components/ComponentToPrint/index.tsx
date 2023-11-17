/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import QRCode from "react-qr-code";



// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <div className="w-[405px] left-0 top-0 z-10 justify-center content-center overflow-auto border-2 border-black">
                <div className="m-2">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-black">មិង ហួរក្លឹបហាត់ប្រាណ & អាងហែលទឹក</p>
                        <p className="text-lg font-semibold text-black">(សាខាចំការដូង)</p>
                    </div>

                    <QRCode
                        className="w-[150px] h-[150px] ml-[220px] mt-[10px]"
                        value={props.uuid}
                    />

                    {props.uuid}
                    <p className="text-lg font-semibold text-black">ការបរិច្ចេទ: {`01-01-2023`}</p>
                    <p className="text-lg font-semibold text-black">Cashier: {props.name}</p>
                    <div className="flex text-lg text-black font-semibold">
                        <div className="flex-grow">តម្លៃសំបុត្រ </div><strong>{props.price}</strong>
                    </div>
                    <hr className="my-2 bg-black h-[2px]" />
                    <div className="text-center">
                        <p className="text-lg font-semibold text-black">កន្សែង:.......... សោរ:.............</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
