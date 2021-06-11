export default class kult4eitemsheet extends ItemSheet{
    get template(){
        return `systems/kult4e/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

}