import{R as e}from"./iframe-CRZ6Ac4Z.js";import{D as p}from"./data-editor-all-BjyL7hQ7.js";import{B as d,D as w,P as t,u as k,d as u}from"./utils-D0c_mtOX.js";import{S}from"./story-utils-Dbym0C7N.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-DUNFbx5h.js";import"./throttle-BXJuAWwP.js";import"./marked.esm-BqBBUUo-.js";import"./flatten-DM1XsXMq.js";import"./scrolling-data-grid-lF0BuJ6L.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(S,null,e.createElement(d,{title:"Row selections",description:e.createElement(w,null,"You can enable row selections by setting ",e.createElement(t,null,"rowSelect")," prop to"," ",e.createElement(t,null,"multi")," for multi-selection or ",e.createElement(t,null,"single")," for single-selection. The row marker behavior and appearance can be controlled via the"," ",e.createElement(t,null,"rowMarkers")," prop.")},e.createElement(o,null)))]},r=o=>{const{cols:a,getCellContent:s}=k(30);return e.createElement(p,{...u,rowSelect:o.rowSelect,rowSelectionMode:o.rowSelectionMode,getCellContent:s,rowMarkers:{kind:o.rowMarkersKind,checkboxStyle:o.rowMarkersCheckboxStyle},onHeaderClicked:(i,m)=>{console.log("onHeaderClicked",i,m)},theme:{rowMarkerIcon:"#ddd"},columns:a,rows:400})};r.args={rowSelect:"single",rowSelectionMode:"auto",rowMarkersKind:"checkbox-visible",rowMarkersCheckboxStyle:"circle"};r.argTypes={rowSelect:{control:{type:"select"},options:["none","single","multi"]},rowSelectionMode:{control:{type:"select"},options:["auto","multi"]},rowMarkersKind:{control:{type:"select"},options:["both","checkbox","number","none","clickable-number","checkbox-visible"]},rowMarkersCheckboxStyle:{control:{type:"select"},options:["square","circle"]}};var l,n,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(30);
  return <DataEditor {...defaultProps} rowSelect={p.rowSelect} rowSelectionMode={p.rowSelectionMode} getCellContent={getCellContent} rowMarkers={{
    kind: p.rowMarkersKind,
    checkboxStyle: p.rowMarkersCheckboxStyle
  }} onHeaderClicked={(col, event) => {
    console.log("onHeaderClicked", col, event);
  }} theme={{
    rowMarkerIcon: "#ddd"
  }} columns={cols} rows={400} />;
}`,...(c=(n=r.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const H=["RowSelections"];export{r as RowSelections,H as __namedExportsOrder,G as default};
