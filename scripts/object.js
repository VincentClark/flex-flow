let converstation = {
    "custom_01": ""
}

converstation.custom_01 = "call sid 1";
console.log(converstation);
converstation = { ...converstation, "custom_02": "call sid 2" };
console.log("converstation", converstation);

