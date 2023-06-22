const [Parada, ParadaAlreadyExistsError, UserNotParadaOwner] = require('../models/parada');

exports.index = async function(req, res) {
  try {
    const tripId = req.params.tripId;
    const paradas = await Parada.listParadasByTrip(tripId);
    res.status(200).json({ data: paradas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving the list of Paradas' });
  }
};

exports.create = async function(req, res) {
  try {
    const newParada = req.body;
    newParada['id_viagem'] = req.params.tripId;
    newParada['id_ponto'] = req.params.turisticSpotId;
    const parada = await Parada.createParada(newParada);
    res.status(201).json({ data: parada });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao criar parada' });
  }
};

exports.delete = async function(req, res) {
  try {
    const { tripId, turisticSpotId } = req.params;
    const userId = req.session.userId;
    await Parada.deleteParada(tripId, turisticSpotId, userId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    if (error instanceof ParadaAlreadyExistsError || error instanceof UserNotParadaOwner) {
      res.status(error.errorCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao deletar parada' });
    }
  }
};

