import * as types from './actionTypes';
import specieApi from '../api/speciesApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function loadSpecies(){
	return function(dispatch){
		dispatch(setLoadingMask());
		return specieApi.getSpecies().then(species => {
			dispatch(removeLoadingMask());
			dispatch(loadSpeciesSuccess(species));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		});
	}
}

export function loadSpeciesSuccess(species){
    return{type:types.LOAD_SPECIES_SUCCESS, species}
}



export function loadSpecieByIdSuccess(specie){
    return {type: types.LOAD_SPECIE_BY_ID_SUCCESS, specie}
}

export function loadSpecieById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return specieApi.getSpecieById(id).then( specie => {
            dispatch(removeLoadingMask());
            dispatch(loadSpecieByIdSuccess(specie));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}


export function removeSpecie(specie){
    return function(dispatch){
        dispatch(setLoadingMask());
        return specieApi.removeSpecie(specie).then(species => {
            dispatch(removeLoadingMask());
            dispatch(loadSpeciesSuccess(species));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}
