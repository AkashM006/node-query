import express from "express";
import {
  createANote,
  deleteANote,
  getAllNotes,
  getOneNote,
  removeAll,
  updateANote,
} from "../controllers/notes";
import { requestErrorHandler } from "../utils/Errors/ErrorHandler";
import validator from "../utils/validation/validator";
import { noteSchema } from "../utils/validation";

const app = express.Router();

/**
 * @openapi
 * /notes:
 *  get:
 *    tags:
 *      - "Get all notes"
 *    summary: "Get all the notes created"
 *    description: "This route returns all the notes created"
 *    responses:
 *      200:
 *        description: "Get all the notes"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                msg:
 *                  type: array
 *                  items:
 *                    $ref: '#components/schema/Notes_fetched'
 */
app.get("/", requestErrorHandler(getAllNotes));

/**
 * @openapi
 * /notes/{id}:
 *  get:
 *    tags:
 *      - "Get note with id of {id}"
 *    summary: "Get note with and id of {id}"
 *    paramters:
 *      - name: id
 *        in: path
 *        description: The id of the note
 *        required: true
 *    responses:
 *      200:
 *        description: "Get the note with the given"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                msg:
 *                  $ref: '#components/schema/Notes_fetched'
 *      404:
 *        description: "The note with the given id is not present"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  type: string
 *                  example: Note with id {id} does not exist
 */
app.get("/:id", requestErrorHandler(getOneNote));

/**
 * @openapi
 * /notes:
 *  post:
 *    tags:
 *      - "Create a new note"
 *    summary: "Create a new note"
 *    parameters:
 *      - name: title
 *        in: body
 *        description: The title of the note
 *        required: true
 *      - name: body
 *        in: body
 *        description:  The details of the note
 *        required: true
 *    responses:
 *      200:
 *        description: "Create a new note by giving the details"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                msg:
 *                  $ref: '#components/schema/Notes_fetched'
 *      422:
 *        description: "Validation error, check the details passed in body of the request"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  $ref: '#components/schema/Validation_errors'
 *
 *
 */
app.post("/", validator(noteSchema), requestErrorHandler(createANote));

/**
 * @openapi
 * /notes/{id}:
 *  put:
 *    tags:
 *      - "Update a note"
 *    summary: "Update a not by providing its new details and also its id in path"
 *    paramters:
 *      - name: id
 *        in: path
 *        description: The id of the note to update
 *        required: true
 *      - name: title
 *        in: body
 *        description: The new title of the note
 *        required: true
 *      - name: body
 *        in: body
 *        description: The details of the note
 *        required: true
 *    responses:
 *      200:
 *        description: The note was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                msg:
 *                  $ref: '#components/schema/Notes_fetched'
 *      404:
 *        description: A note with the given id was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  type: string
 *                  example: Note with id {id} does not exist
 *      422:
 *        description: There was a validation error, so check the paramters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  $ref: '#components/schema/Validation_errors'
 */

app.put("/:id", validator(noteSchema), requestErrorHandler(updateANote));

app.delete("/all", requestErrorHandler(removeAll));

/**
 * @openapi
 * /notes/{id}:
 *  delete:
 *    tags:
 *      - "Delete a note with the given id"
 *    description: This route is used to delete note with the given id
 *    paramters:
 *      - name: id
 *        in: path
 *        description: The id of the note
 *        required: true
 *    responses:
 *      200:
 *        description: The note with the given id was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *      404:
 *        description: The note with the given id was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  type: string
 *                  example: Note with the given id does not exist
 *
 */
app.delete("/:id", requestErrorHandler(deleteANote));

export default app;
