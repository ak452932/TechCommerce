const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, unique: true },
  requester: { type: String, required: true },
  asset: String,
  requestType: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  vendorName: String,
  vendorTicketId: String,
  technician: String,
  mode: { type: String, enum: ['Email', 'Phone', 'Portal'] },
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  category: String,
  subcategory: String,
  item: String,
  site: String,
  subject: { type: String, required: true },
  description: String,
  attachmentUrl: String, // file path or URL
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);