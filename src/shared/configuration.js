// persistent configuration

class Configuration {
	#KEY = '__metayeti.net__';
	#config = null;

	#getDefaultConfig() {
		return {
			lightMode: false
		};
	}
	#load() {
		const localConfig = localStorage.getItem(this.#KEY);
		this.#config = (localConfig) ? JSON.parse(localConfig) : this.#getDefaultConfig();
	}
	constructor() {
		this.#load();
	}
	getConfig() {
		return this.#config;
	}
	save() {
		localStorage.setItem(this.#KEY, JSON.stringify(this.#config));
	}
};

const configuration = new Configuration();

export default configuration;