// function supports_html5_storage() {
//     try {
//       return 'localStorage' in window && window['localStorage'] !== null;
//     } catch (e) {
//       return false;
//     }
// }

  //This class contains information about the player including stats and name,
//and functions to update respective members.
class Player {
    static name = localStorage["name"];
    static health = parseInt(localStorage["health"]);
    static oxygen = parseInt(localStorage["oxygen"]);
    static ammo = parseInt(localStorage["ammo"]);
    static cards = parseInt(localStorage["cards"]);
    static gun = parseInt(localStorage["gun"]);

    static setName(Name) {
        this.name = Name;
    }

    static getName() {
        return this.name;
    }

    static getHealth() {
        return this.health;
    }

    static getOxygen() {
        return this.oxygen;
    }

    static getAmmo() {
        return this.ammo;
    }

    static getCards() {
        return this.cards;
    }

    static incAmmo() {
        this.ammo = this.ammo + 60;
        localStorage["ammo"] = this.ammo;
    }

    static decAmmo() {
        this.ammo = this.ammo - 1;
        localStorage["ammo"] = this.ammo;
    }

    static resetHealth() {
        this.health = 100;
        localStorage["health"] = this.health;
    }

    static resetOxygen() {
        this.oxygen = 100;
        localStorage["oxygen"] = this.oxygen;
    }

    static decHealth(amt) {
        this.health = this.health - amt;
        localStorage["health"] = this.health;
    }

    static decOxygen(amt) {
        this.oxygen = this.oxygen - amt;
        localStorage["oxygen"] = this.oxygen;
    }

    static incCards() {
        this.cards = this.cards + 1;
        localStorage["cards"] = this.cards;
    }

    static decCards() {
        this.cards = this.cards - 1;
        localStorage["cards"] = this.cards;
    }

    static checkGun(){
        return this.gun;
    }

    static pickUpGun(){
        this.gun = 1;
        localStorage["gun"] = this.gun;
    }

}