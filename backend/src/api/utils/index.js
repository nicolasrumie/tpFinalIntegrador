import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);

// Subimos exactamente 3 niveles para llegar a la raíz de la carpeta 'backend'
const __dirname = join(dirname(__filename), "../../../");

export {
    __dirname,
    join
}