import { ElSwitch, ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import { tableData } from './expandable-row-data';
import './expandable-row.scss';

const App = () => {
    const [parentBorder, setParentBorder] = useState(false);
    const [childBorder, setChildBorder] = useState(false);

    return (
        <>
            switch parent border: <ElSwitch onChange={(_, checked) => setParentBorder(checked)} /> switch child border:{' '}
            <ElSwitch onChange={(_, checked) => setChildBorder(checked)} />
            <ElTable data={tableData} border={parentBorder} style={{ width: '100%' }}>
                <ElTableColumn type="expand">
                    {props => (
                        <div className="m4">
                            <p className="mt-0 mb-2">State: {props.row.state}</p>
                            <p className="mt-0 mb-2">City: {props.row.city}</p>
                            <p className="mt-0 mb-2">Address: {props.row.address}</p>
                            <p className="mt-0 mb-2">Zip: {props.row.zip}</p>
                            <h3>Family</h3>
                            <ElTable data={props.row.family} border={childBorder}>
                                <ElTableColumn label="Name" prop="name" />
                                <ElTableColumn label="State" prop="state" />
                                <ElTableColumn label="City" prop="city" />
                                <ElTableColumn label="Address" prop="address" />
                                <ElTableColumn label="Zip" prop="zip" />
                            </ElTable>
                        </div>
                    )}
                </ElTableColumn>
                <ElTableColumn label="Date" prop="date" />
                <ElTableColumn label="Name" prop="name" />
            </ElTable>
        </>
    );
};

export default App;
