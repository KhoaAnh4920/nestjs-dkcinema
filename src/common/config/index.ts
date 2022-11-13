import { merge } from 'lodash';

import * as defaultConf from './default.json';

const envConf = process.env;
const mergedConf = merge(defaultConf, envConf);
// console.log('mergedConf:', mergedConf);
export default (): any => mergedConf;
