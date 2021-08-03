import './dropdown.css';
import React, { useState } from 'react';
import CloseIcon from '../CloseIcon';
import IndicatorIcons from '../IndicatorIcons';

const Dropdown = (props) => {
    const [openList, setOpenList] = useState(false);    
    const selected = props.options
        .filter(option => option.isSelected);
    const isAllSelected = selected.length === props.options.length;

    const selectedItems = ( // selected value to show on the select field
        selected.map(option => (
            <div key={option.id} className="multiSelect">
                <div>{option.label}</div>
                <CloseIcon 
                    removeIcon={(e) => {
                        e.stopPropagation();
                        handleOptionClick(option)                        
                    }}
                    removeIconStyles="multiSelectRemove"
                />
            </div>
        ))
    );

    const SelectField = () => ( // to show the selected option in the select field after each select
        <div className="textAreaDiv">
            <div className="selectedItems" 
                onClick={handleOpen}>
                { selectedItems && selectedItems.length > 0 ? selectedItems : (
                    <div className="placeholder">Select...</div>
                ) }
            </div>
            <IndicatorIcons 
                removeIcon={() => props.optionSelect([])}
                open={handleOpen}
            />
        </div>
    );

    const handleOptionClick = (option) => { // to handle on each option select
        let newSelected = [];

        const alreadySelected = selected
                .map(selected => selected.value)
                .includes(option.value);
        if(alreadySelected) {
            newSelected = selected.filter(selectedItem => selectedItem.value !== option.value);
        } else {
            newSelected = [...selected, option];
        }
        handleSelectAll(newSelected);
        props.optionSelect(newSelected);
    }

    const handleSelectAll = (options) => { // to handle select all and deselect all
        props.optionSelect(isAllSelected ? [] : options);
    }

    const handleOpen = () => { // to open and close the dropdown list
        setOpenList(!openList);
      }

    return (
        <div className="dropdown">
            <div className="textAreaContainer">
                <SelectField />
            </div>
            {
                openList ? 
                (
                    <div className="selectMenu">
                        <div className="selectMenuList">
                            <div 
                                className={"selectOption " + (isAllSelected ? "deSelectAll" : '')}
                                onClick={() => handleSelectAll(props.options)}> {isAllSelected ? 'Deselect All' : 'Select All'}
                            </div>
                            {props.options.map(option => (
                                <div 
                                    key={option.id} 
                                    className={"selectOption " + (option.isSelected ? "selected" : '')} 
                                    onClick={() => handleOptionClick(option) }>{option.label}</div>
                            ))}                
                        </div>
                    </div>
                ) : ''
            }
        </div>
    );
}

export default Dropdown;
