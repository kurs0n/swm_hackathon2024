import {atom} from "jotai";
 
const categoriesAtom = atom([]);

categoriesAtom.debugLabel="Categories";

const markersAtom = atom([]);

markersAtom.debugLabel="Markers";

const singleMarkerAtom = atom(null);
singleMarkerAtom.debugLabel="Single Marker";

const checkedCategoriesAtom = atom([]);
checkedCategoriesAtom.debugLabel="Checked Categories";

export {categoriesAtom,markersAtom,singleMarkerAtom,checkedCategoriesAtom};