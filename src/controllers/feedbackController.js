const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { description } = req.body;

  try {
    const query = req.user.role === 'admin'
      ? { _id: feedbackId } // Admins can update any feedback
      : { _id: feedbackId, userId: req.user._id }; // Normal users can update only their feedback

    const feedback = await Feedback.findOne(query);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.description = description || feedback.description;
    await feedback.save();

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const query = req.user.role === 'admin'
      ? { _id: feedbackId } // Admins can delete any feedback
      : { _id: feedbackId, userId: req.user._id }; // Normal users can delete only their feedback

    const feedback = await Feedback.findOneAndDelete(query);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
