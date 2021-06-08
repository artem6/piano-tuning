const configValues = {
  local: {
    sampleRate: 44100, // audioContext.sampleRate
    fftSize: 16384 * 2, // analyser.fftSize = 32 - 16384 - 32768;
    minDecibels: -90, // analyser.minDecibels = -90;
    maxDecibels: -10, // analyser.maxDecibels = -10;
  },
};

type ConfigValues = typeof configValues;
export type ConfigEnv = keyof ConfigValues;
export type ConfigTypes = keyof ConfigValues['local'];

let currentEnv: ConfigEnv = 'local';

function setConfigEnv(env: ConfigEnv) {
  currentEnv = env;
  localStorage.setItem('env', env);
}

const config = <T extends ConfigTypes>(key: T, env: ConfigEnv = currentEnv): ConfigValues['local'][T] => {
  return configValues[env][key];
};

export default config;
export { setConfigEnv };
