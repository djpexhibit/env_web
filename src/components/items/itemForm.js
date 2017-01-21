import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ItemForm = ({item, allSuppliers, onSave, onChange, loading, errors}) => {
    console.log(item);
    return(
        <form>
            <h1>Manage Item</h1>
            <TextInput
                name="name"
                label="Name"
                value={item.name}
                onChange={onChange}
                error={errors.name} />

            <SelectInput
                name="supplierId"
                label="Supplier"
                value={item.supplierId}
                defaultOption="Select Supplier"
                options={allSuppliers}
                onChange={onChange}
                error={errors.supplierId} />

            <TextInput
                name="category"
                label="Category"
                value={item.category}
                onChange={onChange}
                error={errors.category} />
            
            <TextInput
                name="length"
                label="Length"
                value={item.length}
                onChange={onChange}
                error={errors.length} />

            <input
                type="submit"
                disabled={loading}
                value={loading? 'Saving...' : 'Save'}
                className = "btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

ItemForm.propTypes = {
    item : React.PropTypes.object.isRequired, 
    allSuppliers: React.PropTypes.array, 
    onSave: React.PropTypes.func.isRequired, 
    onChange: React.PropTypes.func.isRequired, 
    loading: React.PropTypes.bool, 
    errors: React.PropTypes.object
};

export default ItemForm;