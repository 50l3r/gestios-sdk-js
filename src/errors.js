// Create a new object, that prototypically inherits from the Error constructor
function NetworkError(error) {
	this.name = 'NetworkError';
	this.code = 0;
	this.ok = false;
	this.message = error || 'No es posible acceder a los servicios de GestiOS';
	this.stack = new Error().stack;
}

function GestiOSError(error) {
	this.name = 'GestiOSError';
	this.code = error.response.status;
	this.message = null;
	this.ok = false;

	if (error.response.data.error !== undefined) {
		if (this.code === 400) {
			this.message = 'No se han recibido los parámetros correctos';
			this.errors = error.response.data.error;
		} else {
			this.message = error.response.data.error;
		}
	}

	if (error.response.data.error !== undefined) {
		if (error === null) {
			switch (this.code) {
			case 404:
				this.message = 'No se encontraron resultados';
				break;

			case 400:
				this.message = 'No se han recibido los parámetros correctos';
				break;

			case 500:
				this.message = 'Ocurrió un error interno. Contacte con soporte';
				break;

			case 401:
				this.message = 'No está autenticado';
				break;

			case 403:
				this.message = 'Acceso no autorizado al recurso';
				break;

			default:
				this.message = 'Ocurrió un error desconocido';
			}
		}
	}
}

NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.constructor = NetworkError;

GestiOSError.prototype = Object.create(Error.prototype);
GestiOSError.prototype.constructor = GestiOSError;

module.exports = { NetworkError, GestiOSError };
