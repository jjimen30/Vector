/**
 * A three demensional vector API. Represented as a row vector, it provides all the vector operations. 
 *
 * @version v12.10.0
 * @author Jorge Jimenez
 */
var Vector = function(x, y, z = 0) {
    try {

        validateXY(x, y);
    } catch (e) {
        console.log("Exception: " + e);
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.limit = 0;
}

/**
 * Calculates the cross product of two Vector objects and returns a new Vector
 * composed of the result.
 * 
 * @return {Vector} The resutlt of the crossing this vector with another vector.
 */
Vector.prototype.cross = function(v) {
    validateVector(v);

    var i;
    var j;
    var k;
    i = (this.y * v.z) - (this.z * v.y);
    j = -1 * (this.x * v.z) - (this.z * v.x);
    k = (this.x * v.y) - (this.y * v.x);

    return new Vector(i, j, k);
}

/**
 * Calculates the distance between this and another vector.
 * 
 * @param  {Vector} The distance from this to that vector.
 * @return {Integer} The scalar distance from this to that vector.
 */
Vector.prototype.dist = function(that) {
    validateVector(that);

    var v = Vector.sub(this, that);
    return v.mag();
}

/**
 * Adds a vector to this vector.
 * 
 * @param {Vector} The vector added to this vector.
 * @throws exception if other is not a {Vector}.
 */
Vector.prototype.add = function(other) {
    validateVector(other);

    this.set(this.x + other.x, this.y + other.y, this.z + other.z);
}

/**
 * Subtracts a vector from this vector.
 * 
 * @param {Vector} The vector subtracted from this vector.
 * @throws exception if other is not a {Vector}.
 */

Vector.prototype.sub = function(other) {
    validateVector(other);

    this.set(this.x - other.x, this.y - other.y, this.z - other.z);
}

/**
 * Returns the dot product between this and 
 * another vector.
 * 
 * @param  {Vector} A vector used to calculate the dot pruct with this vector.
 * @return The scalar dot product.
 */
Vector.prototype.dot = function(other) {
    validateVector(other);

    return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
}

/**
 * Returns the magnitude of the vector.
 * 
 * @return The scalar magnitude of this vector.
 */
Vector.prototype.mag = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}

/**
 * Rotates this vector.
 * 
 * @param  The angle to rotate.
 * @return {Vector} This vector after the rotation (useful for chaining).
 */
Vector.prototype.rotate = function(angle) {
    // x' = x * cos(angle) - y * sin(angle);
    // y' = x * sin(angle) + y * cos(angle);

    if (angle != 0) {
        var newx = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        var newy = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.set(newx, newy);
    }

    return this;
}

/**
 * Normalizes this vector (turning it into a unit vector).
 * 
 * @return {Vector} This vector after the operation (useful for chaining).
 */
Vector.prototype.normalize = function() {
    var mag = this.mag();
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;

    return this;
}

/**
 * Returns a copy of this vector.
 * 
 * @return {Vector} A copy of this 
 */
Vector.prototype.get = function() {
    return new Vector(this.x, this.y, this.z);
}

/**
 * Multiply this vector by a scalar.
 * 
 * @param  A scalar to multiply this vector by.
 * @return {Vector} This vector after the multiplication.
 */
Vector.prototype.mult = function(scalar) {
    this.set(this.x * scalar, this.y * scalar, this.z * scalar);

    return this;
}

/**
 * Divide this vector by a scalar.
 * 
 * @param  A scalar to divide this vector by.
 * @return {Vector} This vector after the operation.
 */
Vector.prototype.div = function(scalar) {
    this.set(this.x / scalar, this.y / scalar, this.z / scalar);

    return this;
}

/**
 * Sets this vector's components.
 *
 * @param {scalar} The x component.
 * @param {scalar} The y component.
 * @param {scalar} The z component.
 */
Vector.prototype.set = function(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;

    if (this.limit > 0 && this.mag() > this.limit) {

        this.normalize();
        this.x = this.x * this.limit;
        this.y = this.y * this.limit;
        this.z = this.z * this.limit;
    }

    return this;
}

/**
 * Sets the magnitude of this vector.
 *
 * @param {scalar} mag The magnitude to set this vector to.
 * @return {Vector} This vector after the operation.
 */
Vector.prototype.setMag = function(mag) {
    this.set(this.x * mag, this.y * mag, this.z * mag);
    return this;
}

/**
 * Sets the limit magnitude for the vector.
 * 
 * @param {scalar} The new limit for this vector.
 */
Vector.prototype.setLimit = function(limit) {
    if (!(this.limit > limit))
        this.limit = limit;
}

/**
 * Prints the vector to console i.e., "[2, 4, 5]"
 */
Vector.prototype.print = function() {
    console.log("[" + this.x + ", " + this.y + ", " + this.z + "]");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++ S T A T I C   F U N C T I O N S +++++++++++++++++++++++++++++++

/**
 * Subtracts two vectors.
 * 
 * @param  {Vector} v1 The vector to subtract from.
 * @param  {Vector} v2 The vector to subtract.
 * @return {Vector} The result of the subtraction.  
 */
Vector.sub = function(v1, v2) {
    validateNumArgs(2, arguments);
    validateVector(v1);
    validateVector(v2);

    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

/**
 * Returns a normalized vector from the vector passed in and does not change the vector passed in.
 *
 * @param  {Vector} The vector to normalize.
 * @return {Vector} The normalized vector.
 * @throws exception if the magnitude is less than 1
 */
Vector.getUnitVector = function(v) {
    validateVector(v);

    // var mag = v.mag();
    // if (mag == 0)
    //     throw "The magnitude of your vector is zero.";

    // // console.log("updated yo");

    // var x = v.x / mag;
    // var y = v.y / mag;
    // var z = v.z / mag;
    // var normalV = new Vector(x, y, z)

    // console.log(normalV);

    // return normalV;
    // 
    // 
    var normal = v.get();
    return normal.normalize();
}

/**
 * Multiplies a vector by a scalar and returns the result as a new Vector object.
 * 
 * @param  {Vector} The vector to perform scalar multiplication on.
 * @param  {scalar} The scalar multiple.
 * @return {Vector} The result of the scalar multiplication.
 */
Vector.mult = function(v, scalar) {
    validateNumArgs(2, arguments);
    validateVector(v);

    // OLD
    // var x = v.x;
    // var y = v.y;
    // var z = v.z;

    // return new Vector(x * scalar, y * scalar, z * scalar);


    // UPDATED
    var scalarMultiple = v.get();
    return scalarMultiple.mult(scalar);
}

/**
 * Divides the passed vector by the passed scalar.
 * 
 * @param  {Vector} The vector to perform scalar division on.
 * @param  {scalar} The scalar multiple.
 * @return {Vector} The result of the scalar division.
 */
Vector.div = function(v, scalar) {
    validateArgIsNotZero(scalar);
    validateVector(v1);
    validateNumArgs(2, arguments);

    // OLD
    // var x = v.x;
    // var y = v.y;
    // var z = v.z;
    // return new Vector(x / scalar, y / scalar, z / scalar);

    // UPDATED
    var scalarMultiple = v.get();
    return scalarMultiple.div(scalar);
}

/**
 * Takes to Vector objects and ands them.
 * 
 * @param {Vector} v1 The first vector to add.
 * @param {Vector} v2 The second vector to add.
 * @return {Vector} The vector result of the operation.
 */
Vector.add = function(v1, v2) {
    validateVector(v1);
    validateVector(v2);

    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}



/**
 * Calculates and returns the angle between two 
 * vectors and returns the value in
 * radians
 *
 * @param {Vector} v1 The first vector.
 * @param {Vector} v2 The second vector.
 * @return {scalar} The angle between the two vectors.
 */
Vector.angleBetween = function(v1, v2) {
    /*
     * ø = arccos(v•v2 / |v|•|v2|)
     */

    // v dotted with v2
    var dot = v1.dot(v2);

    // The magnitudes of the vectors
    var mag1 = v1.mag();
    var mag2 = v2.mag();

    var result = dot / (mag1 * mag2);

    return Math.acos(result);
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++ E X C E P T I O N S   H E L P E R S ++++++++++++++++++++++++++++++

function validateNumArgs(n, args) {
    if (args.length < n)
        throw "The number of arguments passed should be " + n;
}

function validateArgIsNotZero(input) {
    if (input == 0)
        throw "The argument should not be zero.";
}

function validateVector(v) {
    if (v == undefined)
        throw "The vector passed in is undefined.";
    if (!(v instanceof Vector))
        throw "The argument passed is not of type Vector.";
}


function validateXY(x, y) {
    if (x == undefined || y == undefined) {
        throw "x and y must be set.";
    }
}