/**
 * @openapi
 * components:
 *  schema:
 *      Notes:
 *          properties:
 *              title:
 *                  type: string
 *              body:
 *                  type: string
 *      Notes_fetched:
 *          properties:
 *              id:
 *                  type: string
 *                  example: 5ed041c2-04d1-4a8b-a9f5-28e6fb6f3f77
 *              title:
 *                  type: string
 *                  example: Doing laundry
 *              body:
 *                  type: string
 *                  example: Take the clothes out for a wash
 *              created_at:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-05T09:48:53.712Z
 *              updated_at:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-05T09:48:53.712Z
 *      Validation_errors:
 *          properties:
 *              fieldErrors:
 *                  type: object
 *                  properties:
 *                      fieldName:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: fieldName is required
 */
