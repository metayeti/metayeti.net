// persistent configuration

class Configuration {

	lightMode = false; // we only store this value, so this class is optimized for that

	#KEY = '___metayeti.net___';

	#getDefaultConfig() {
		return {
			lightMode: false
		};
	}
	#load() {
		const localConfig = localStorage.getItem(this.#KEY);
		this.lightMode = localConfig === "1";
	}

	constructor() {
		this.#load();
	}
	isLightMode() {
		return this.lightMode;
	}
	setLightMode(isLightMode) {
		this.lightMode = isLightMode;
		localStorage.setItem(this.#KEY, isLightMode ? "1" : "0");
	}
};

const configuration = new Configuration();

export default configuration;