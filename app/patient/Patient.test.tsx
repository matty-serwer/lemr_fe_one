import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Patient from './page';
import '@testing-library/jest-dom';

// Mocking useSearchParams and useRouter
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

// Mocking fetchNotes and postNewNote
jest.mock('@/app/api/noteApi', () => ({
  fetchNotes: jest.fn(),
  postNewNote: jest.fn(),
}));

const mockFetchNotes = jest.requireMock('@/app/api/noteApi').fetchNotes;
const mockPostNewNote = jest.requireMock('@/app/api/noteApi').postNewNote;

describe('Patient component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseSearchParams.mockReset();
    mockUseRouter.mockReset();
    mockFetchNotes.mockReset();
    mockPostNewNote.mockReset();
  });

  // Test cases focusing on data handling
  it('should fetch notes when patientId is available', async () => {
    // Arrange
    const patientId = '123';
    mockUseSearchParams.mockReturnValue({ get: () => patientId });
    mockFetchNotes.mockResolvedValue([{ id: '1', patientId: '123' }]);

    // Act
    render(<Patient />);

    // Assert
    await waitFor(() => expect(mockFetchNotes).toHaveBeenCalledTimes(1));
    expect(mockFetchNotes).toHaveBeenCalledWith(patientId);
  });

  it('should not fetch notes when patientId is not available', async () => {
    // Arrange
    mockUseSearchParams.mockReturnValue({ get: () => null });

    // Act
    render(<Patient />);

    // Assert
    await waitFor(() => expect(mockFetchNotes).not.toHaveBeenCalled());
  });

  it('should update notes after creating a new note', async () => {
    // Arrange
    const patientId = '123';
    mockUseSearchParams.mockReturnValue({ get: () => patientId });
    mockFetchNotes.mockResolvedValue([{ id: '1', patientId: '123' }]);
    mockPostNewNote.mockResolvedValue({});

    // Act
    render(<Patient />);
    const addButton = screen.getByText('Add Note');
    fireEvent.click(addButton);
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);

    // Assert
    await waitFor(() => expect(mockFetchNotes).toHaveBeenCalledTimes(2));
  });

  it('should handle error when fetching notes fails', async () => {
    // Arrange
    const patientId = '123';
    mockUseSearchParams.mockReturnValue({ get: () => patientId });
    mockFetchNotes.mockRejectedValue(new Error('Failed to fetch notes'));

    // Act
    render(<Patient />);

    // Assert
    await waitFor(() => expect(mockFetchNotes).toHaveBeenCalledTimes(1));
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  // Test cases focusing on rendering and user interactivity
  it('should render notes when available', async () => {
    // Arrange
    const patientId = '123';
    mockUseSearchParams.mockReturnValue({ get: () => patientId });
    mockFetchNotes.mockResolvedValue([{ id: '1', patientId: '123' }]);

    // Act
    render(<Patient />);

    // Assert
    await waitFor(() => expect(screen.getByText('NoteCard')).toBeInTheDocument());
  });

  it('should render Add Note button', () => {
    // Arrange
    mockUseSearchParams.mockReturnValue({ get: () => null });

    // Act
    render(<Patient />);

    // Assert
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('should open modal when Add Note button is clicked', () => {
    // Arrange
    mockUseSearchParams.mockReturnValue({ get: () => null });

    // Act
    render(<Patient />);
    const addButton = screen.getByText('Add Note');
    fireEvent.click(addButton);

    // Assert
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('should display current patient ID', () => {
    // Arrange
    const patientId = '123';
    mockUseSearchParams.mockReturnValue({ get: () => patientId });

    // Act
    render(<Patient />);

    // Assert
    expect(screen.getByText(`Current Patient ID: ${patientId}`)).toBeInTheDocument();
  });
});