router.use(require('./partyRoutes'));

// Get all parties
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        })
    })
})

// Get single party with id
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return;
        }

        res.json({
            message: 'success',
            data: row
        })
    })
})

app.delete('/api/party/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params,  function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({ message: 'successfully deleted', changes: this.changes })
    })
})

module.exports = router;